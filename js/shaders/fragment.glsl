varying float vNoise;
uniform sampler2D forestTexture;
uniform float time;

varying vec2 vUv;
void main()	{
    // vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    // gl_FragColor = vec4(vNoise,1.0,1.,0.1);

    vec2 newvUV = vUv;

    newvUV = vec2(newvUV.x + sin(time + newvUV.y*10.) * .01,newvUV.y + sin(time + newvUV.y*10.) * .01);

    vec4 forestView = texture2D(forestTexture, newvUV);

    vec3 color1 = vec3(.9,0.5,.5);
    vec3 color2 = vec3(.1,1.,1.);
    vec3 finalColor = mix(color1,color2,(vNoise + 1.) * .5);
    gl_FragColor = vec4(finalColor,1.);
    // gl_FragColor = forestView;
}