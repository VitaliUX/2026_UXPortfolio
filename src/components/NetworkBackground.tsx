import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── constants ──────────────────────────────────────────────────────────────────
const NODE_COUNT = 80;
const SPREAD_X   = 30;
const SPREAD_Y   = 18;
const SPREAD_Z   = 10;
const MAX_DIST   = 10;
const BLUE = new THREE.Color(0x3b82f6);
const WHITE = new THREE.Color(0xffffff);

// ── helpers ───────────────────────────────────────────────────────────────────
const rand = (a: number, b: number) => a + Math.random() * (b - a);

// ── main scene ────────────────────────────────────────────────────────────────
function NetworkScene() {
  // Node state (positions + velocities kept in plain arrays for perf)
  const pos = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3]     = rand(-SPREAD_X, SPREAD_X);
      arr[i * 3 + 1] = rand(-SPREAD_Y, SPREAD_Y);
      arr[i * 3 + 2] = rand(-SPREAD_Z, SPREAD_Z);
    }
    return arr;
  }, []);
  const vel = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3]     = rand(-0.013, 0.013);
      arr[i * 3 + 1] = rand(-0.013, 0.013);
      arr[i * 3 + 2] = rand(-0.007, 0.007);
    }
    return arr;
  }, []);

  // Impulse state
  type Impulse = { a: number; b: number; t: number; speed: number };
  const impulses = useRef<Impulse[]>([]);

  // Buffer geometry refs
  const edgePosRef = useRef<THREE.BufferAttribute>(null!);
  const edgeAlpRef = useRef<THREE.BufferAttribute>(null!);
  const nodePosRef = useRef<THREE.BufferAttribute>(null!);
  const impPosRef  = useRef<THREE.BufferAttribute>(null!);

  const edgeGeoRef = useRef<THREE.BufferGeometry>(null!);
  const nodeGeoRef = useRef<THREE.BufferGeometry>(null!);
  const impGeoRef  = useRef<THREE.BufferGeometry>(null!);

  // Pre-alloc working arrays
  const edgeBuf = useMemo(() => new Float32Array(NODE_COUNT * NODE_COUNT * 6), []);
  const alpBuf  = useMemo(() => new Float32Array(NODE_COUNT * NODE_COUNT * 2), []);
  const impBuf  = useMemo(() => new Float32Array(3000), []);

  // Mouse parallax
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 4;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * -2;
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame(({ camera }) => {
    // 1) Move nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
      pos[ix] += vel[ix]; pos[iy] += vel[iy]; pos[iz] += vel[iz];
      if (Math.abs(pos[ix]) > SPREAD_X) vel[ix] *= -1;
      if (Math.abs(pos[iy]) > SPREAD_Y) vel[iy] *= -1;
      if (Math.abs(pos[iz]) > SPREAD_Z) vel[iz] *= -1;
    }

    // 2) Rebuild edges
    let ev = 0, av = 0;
    const activeEdges: { a: number; b: number }[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
        const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.2;
          edgeBuf[ev++] = pos[i*3]; edgeBuf[ev++] = pos[i*3+1]; edgeBuf[ev++] = pos[i*3+2];
          edgeBuf[ev++] = pos[j*3]; edgeBuf[ev++] = pos[j*3+1]; edgeBuf[ev++] = pos[j*3+2];
          alpBuf[av++] = alpha; alpBuf[av++] = alpha;
          activeEdges.push({ a: i, b: j });
        }
      }
    }

    if (edgePosRef.current) {
      edgePosRef.current.array = edgeBuf; edgePosRef.current.count = ev / 3; edgePosRef.current.needsUpdate = true;
      edgeAlpRef.current.array = alpBuf;  edgeAlpRef.current.count = av;     edgeAlpRef.current.needsUpdate = true;
      edgeGeoRef.current.setDrawRange(0, ev / 3);
    }

    // 3) Node positions
    if (nodePosRef.current) {
      nodePosRef.current.array = pos; nodePosRef.current.count = NODE_COUNT; nodePosRef.current.needsUpdate = true;
      nodeGeoRef.current.setDrawRange(0, NODE_COUNT);
    }

    // 4) Spawn impulses
    if (activeEdges.length > 0 && impulses.current.length < 80) {
      if (Math.random() < 0.25) {
        const e = activeEdges[Math.floor(Math.random() * activeEdges.length)];
        impulses.current.push({ a: e.a, b: e.b, t: 0, speed: 0.005 + Math.random() * 0.01 });
      }
    }

    // 5) Update impulses
    let iv = 0;
    impulses.current = impulses.current.filter(imp => {
      imp.t = Math.min(imp.t + imp.speed, 1);
      const ax = pos[imp.a*3], ay = pos[imp.a*3+1], az = pos[imp.a*3+2];
      const bx = pos[imp.b*3], by = pos[imp.b*3+1], bz = pos[imp.b*3+2];
      impBuf[iv++] = ax + (bx-ax)*imp.t;
      impBuf[iv++] = ay + (by-ay)*imp.t;
      impBuf[iv++] = az + (bz-az)*imp.t;
      return imp.t < 1;
    });
    if (impPosRef.current) {
      impPosRef.current.array = impBuf; impPosRef.current.count = iv / 3; impPosRef.current.needsUpdate = true;
      impGeoRef.current.setDrawRange(0, iv / 3);
    }

    // 6) Camera parallax
    camera.position.x += (mouse.current.x - camera.position.x) * 0.02;
    camera.position.y += (mouse.current.y - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  // ── materials ──────────────────────────────────────────────────────────────
  const edgeMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uColor: { value: BLUE } },
    vertexShader: `attribute float alpha; varying float vA;
      void main(){ vA=alpha; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uColor; varying float vA;
      void main(){ gl_FragColor=vec4(uColor,vA); }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  const nodeMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uColor: { value: BLUE } },
    vertexShader: `void main(){
      gl_PointSize=5.0;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uColor; void main(){
      float d=length(gl_PointCoord-0.5)*2.0;
      float a=1.0-smoothstep(0.5,1.0,d);
      gl_FragColor=vec4(uColor,a*0.35); }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  const impMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uColor: { value: WHITE } },
    vertexShader: `void main(){
      gl_PointSize=18.0;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uColor; void main(){
      float d=length(gl_PointCoord-0.5)*2.0;
      float core=1.0-smoothstep(0.0,0.2,d);
      float glow=1.0-smoothstep(0.2,1.0,d);
      vec3  col =mix(vec3(0.5,0.75,1.0),uColor,core);
      gl_FragColor=vec4(col, core*0.95+glow*0.5); }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  // ── initial buffer attributes (large pre-alloc, draw range controls actual count) ──
  const edgePosAttr = useMemo(() => {
    const a = new THREE.BufferAttribute(edgeBuf, 3); a.setUsage(THREE.DynamicDrawUsage); return a;
  }, [edgeBuf]);
  const edgeAlpAttr = useMemo(() => {
    const a = new THREE.BufferAttribute(alpBuf, 1); a.setUsage(THREE.DynamicDrawUsage); return a;
  }, [alpBuf]);
  const nodePosAttr = useMemo(() => {
    const a = new THREE.BufferAttribute(pos, 3); a.setUsage(THREE.DynamicDrawUsage); return a;
  }, [pos]);
  const impPosAttr = useMemo(() => {
    const a = new THREE.BufferAttribute(impBuf, 3); a.setUsage(THREE.DynamicDrawUsage); return a;
  }, [impBuf]);

  // Assign refs immediately after first render
  useEffect(() => {
    edgePosRef.current = edgePosAttr;
    edgeAlpRef.current = edgeAlpAttr;
    nodePosRef.current = nodePosAttr;
    impPosRef.current  = impPosAttr;
  }, [edgePosAttr, edgeAlpAttr, nodePosAttr, impPosAttr]);

  return (
    <>
      <lineSegments material={edgeMat}>
        <bufferGeometry ref={edgeGeoRef}>
          <primitive attach="attributes-position" object={edgePosAttr} />
          <primitive attach="attributes-alpha"    object={edgeAlpAttr} />
        </bufferGeometry>
      </lineSegments>

      <points material={nodeMat}>
        <bufferGeometry ref={nodeGeoRef}>
          <primitive attach="attributes-position" object={nodePosAttr} />
        </bufferGeometry>
      </points>

      <points material={impMat}>
        <bufferGeometry ref={impGeoRef}>
          <primitive attach="attributes-position" object={impPosAttr} />
        </bufferGeometry>
      </points>
    </>
  );
}

// ── exported wrapper ──────────────────────────────────────────────────────────
export const NetworkBackground = () => (
  <div
    style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    aria-hidden="true"
  >
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 28], fov: 55, near: 0.1, far: 300 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <NetworkScene />
    </Canvas>
  </div>
);
