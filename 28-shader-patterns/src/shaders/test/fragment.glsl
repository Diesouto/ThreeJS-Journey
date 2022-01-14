varying vec2 vUv;

void main()
{
    // float strength = vUv.x; // horizontal
    // float strength = vUv.y; // vertical
    // float strength = vUv.y - 1; // reversed vertical
    // float strength = (vUv * 10, 1.0); // strong white

    // float strength = mod(vUv.x * 10.0, 1.0); // wave effect
    // strength = step(0.5, strength); // stronger wave effect
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0)); // makes a net with previous line

    float strength = step(0.8, mod(vUv.x * 10.0, 1.0)); 
    strength *= step(0.8, mod(vUv.y * 10.0, 1.0)); // Gets intesections between strength lines

    // gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // gl_FragColor = vec4(vUv, 0.0, 1.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
}