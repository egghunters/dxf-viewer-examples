export declare const vertex = "\n    #include <clipping_planes_pars_vertex>\n\n    attribute int tileObjectId;\n    flat varying int vTileObjectId;\n    #include <common_ex>\n    void main() {\n\n        vec4 mvPosition = vec4(position, 1.0);\n        #include <clipping_planes_vertex>\n        vTileObjectId = tileObjectId;\n\n        #ifdef USE_INSTANCING\n            mvPosition = instanceMatrix * mvPosition;\n        #endif\n        gl_Position = projectionMatrix * modelViewMatrix * mvPosition;\n    }\n";
export declare const fragment = "\n    #include <clipping_planes_pars_fragment>\n\n    flat varying int vTileObjectId;\n    uniform sampler2D uStateTexture;\n    uniform float uTextureWidth;\n    uniform float uTextureHeight;\n    // uniform bool uIsIsolating;\n    #include <common_ex>\n    void main() {\n        #include <clipping_planes_fragment>\n        vec4 textureColor = getTextureColorByTileObjectId(uStateTexture, uTextureWidth, uTextureHeight, vTileObjectId);\n        // If is isolating, other objects(which is hidden or transparent) are not pickable.\n        // if (uIsIsolating && !isIsolated(textureColor)) {\n        //     discard;\n        // }\n        // if an object is hidden, it is not pickable\n        if (isHidden(textureColor)) {\n            discard;\n        }\n        // if an object is transparent, it is not pickable\n        if (isTransparent(textureColor)) {\n            discard;\n        }\n\n        gl_FragColor = tileObjectId2Color(vTileObjectId);\n    }\n";