# Synctree nblock 

Synctree nblock은 Google의 Blockly를 base로 하여 만들어졌습니다.

기본적인 사용법은 Blockly와 같으나, Synctree 자체의 테마와, 개선된 기능,

유용한 plugin 등을 추가하여 더욱 더 쉽게 Blockly를 접할 수 있도록 개선하였습니다.

![Overview](https://guidebook.synctreestudio.com/img/assets/image%20%28186%29.png)

### Installing Synctree nblock

Synctree nblock is [available on npm](https://www.npmjs.com/package/synctree-nblock).

```bash
npm i synctree-nblock
```

### Usage

```js
import Blockly from "synctree-nblock";

const options = {
    toolbox: document.getElementById("toolbox"),
    media: "/media/blockly/",
    theme: Blockly.Themes.Synctree,
    renderer: "synctree",
};
const workspace = Blockly.inject("blocklyDiv", options);
```

현재 베타버전 이라서 더욱 많은 기능이 추가되면 업데이트 하겠습니다.

<!-- ### Added plug-in -->
