import { Camera, Layers, MeshBasicMaterial, Scene, ShaderMaterial, Vector2, WebGLRenderer } from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'

export default class EffectsManager {
    private composer: EffectComposer
    private bloomComopser: EffectComposer;
    // private outlinePass: OutlinePass
    private fxaaPass: ShaderPass
    private renderer: WebGLRenderer
    private scene: Scene;
    private camera: Camera;
    private resolution = new Vector2(window.innerWidth, window.innerHeight);

    public bloomLayer

    constructor(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.composer = this.buildComposer()
        // this.outlinePass = new OutlinePass(
        //     this.resolution,
        //     this.scene,
        //     this.camera
        // )
        this.fxaaPass = new ShaderPass(FXAAShader);
        this.bloomComopser = new EffectComposer(this.renderer);
        this.bloomLayer = new Layers();
        this.bloomLayer.set(BLOOM_LAYER)
        this.composeEffects()
    }

    public render() {
        this.composer.render()
    }

    // Oh, I know, it looks terrible
    // TODO: Refactoring
    public renderBloom() {
        const materials: { [Key: string]: any } = {}
        this.scene.traverse((obj) => {
            const darkMaterial = new MeshBasicMaterial( { color: 'black' } );
            //@ts-ignore
            if ( obj.isMesh && this.bloomLayer.test( obj.layers ) === false ) {
                // @ts-ignore
                materials[ obj.uuid ] = obj.material;
                // @ts-ignore
                obj.material = darkMaterial;
            }
        })
        this.bloomComopser.render();
        this.scene.traverse(( obj ) => {
            if ( materials[ obj.uuid ] ) {
                // @ts-ignore
                obj.material = materials[ obj.uuid ];
                delete materials[ obj.uuid ];
            }
        });
    }

    private buildComposer() {
        return new EffectComposer( this.renderer )
    }

    private composeEffects() {
        const renderPass = new RenderPass(this.scene, this.camera);

        const bloomPass = new UnrealBloomPass(
            this.resolution,
            2,
            1,
            0
        )
        this.bloomComopser.renderToScreen = false;
        this.bloomComopser.addPass(renderPass);
        this.bloomComopser.addPass(bloomPass);
        const mixPass = new ShaderPass(
            new ShaderMaterial( {
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: this.bloomComopser.renderTarget2.texture }
                },
                // @ts-ignore
                vertexShader: document.getElementById( 'vertexshader' ).textContent,
                // @ts-ignore
                fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                defines: {}
            } ), 'baseTexture'
        );
        mixPass.needsSwap = true;
        // this.outlinePass.visibleEdgeColor.set('#ffffff')
        // this.outlinePass.hiddenEdgeColor.set('#fefefe')
        // this.outlinePass.edgeStrength = 8
        // this.outlinePass.edgeThickness = 1.0
        // this.outlinePass.pulsePeriod = 0
        // this.outlinePass.usePatternTexture = false

        // this.composer.addPass( this.outlinePass )

        const pixelRatio = this.renderer.getPixelRatio();

        // this.fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
        // this.fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );

        const outputPass = new OutputPass();

        // this.composer.addPass( this.fxaaPass )
        this.composer.addPass(renderPass)
        this.composer.addPass(mixPass)
        this.composer.addPass(outputPass)

    }
}

export const BLOOM_LAYER = 1;
