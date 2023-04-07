const CracoAntDesignPlugin = require("craco-antd");
var CracoLessPlugin= require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeThemeLessPath: './theme/Style/AntdRewrite.less',
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "primary-color": "#1fb5ac",
                            "border-radius-base": "5px",
                            "body-background": "#f6f6f6"
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
