window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Boom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02a5fQdE2pDaKO3a/rsLz28", "Boom");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        king: {
          default: null,
          type: cc.Node
        },
        voiceLose: {
          default: null,
          url: cc.AudioClip
        }
      },
      judgeJump: function judgeJump() {
        var self = this;
        console.log("\u8df3\u8dc3\u5224\u65ad");
        "jump" == self.king.getComponent("King").state ? console.log("jump*********************************") : cc.director.loadScene("over");
      },
      judgeDown: function judgeDown() {
        var self = this;
        console.log("\u4e0b\u8e72\u5224\u65ad");
        if ("down" == self.king.getComponent("King").state) console.log("down*********************************"); else {
          this.current = cc.audioEngine.play(self.voiceLose, false, 1);
          cc.director.loadScene("over");
        }
      },
      onLoad: function onLoad() {
        this.schedule(function() {
          if (Math.random() > .5) {
            console.log("create a boom low .........");
            this.getComponent(cc.Animation).play("boom_low");
          } else {
            console.log("create a boom hight .........");
            this.getComponent(cc.Animation).play("boom_hight");
          }
        }, 3);
      }
    });
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8f244GTwdHbKN0vHafsLEG", "Game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        king: {
          default: null,
          type: cc.Node
        },
        voiceJump: {
          default: null,
          url: cc.AudioClip
        },
        voiceDown: {
          default: null,
          url: cc.AudioClip
        },
        musicGame: {
          default: null,
          url: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        var self = this;
        this.musicGame = cc.audioEngine.play(self.musicGame, true);
        cc.audioEngine.setMaxAudioInstance(1);
        cc.audioEngine.setVolume(this.musicGame, .5);
        this.node.on("touchstart", function(event) {
          console.log("touchstart");
          var visibleSize = cc.winSize;
          if (event.getLocationX() < visibleSize.width / 2) {
            cc.audioEngine.play(self.voiceDown, false, 1);
            self.king.getComponent("King").jumpDown();
          } else {
            cc.audioEngine.play(self.voiceJump, false, 1);
            self.king.getComponent("King").jumpUp();
          }
        });
        this.node.on("touchend", function(event) {
          console.log("touchend");
          var visibleSize = cc.winSize;
          event.getLocationX() < visibleSize.width / 2 && self.king.getComponent("King").jumpRelease();
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  King: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5224a/bUeBFdKlyKCaRNGQS", "King");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        jumpHight: 0,
        jumpDelay: 0,
        scaleNumber: 0,
        state: "run"
      },
      jumpUp: function jumpUp() {
        console.log("\u8df3\u8dc3");
        if ("run" == this.state) {
          this.state = "jump";
          this.getComponent(cc.Animation).stop();
          this.node.runAction(cc.sequence(cc.jumpBy(this.jumpDelay, cc.p(0, 0), this.jumpHight, 1), cc.callFunc(function() {
            console.log("\u8df3\u5b8c\u4e86");
            this.run();
          }, this)));
        }
      },
      jumpDown: function jumpDown() {
        console.log("\u4e0b\u8e72");
        if ("run" == this.state) {
          this.state = "down";
          this.node.runAction(cc.scaleTo(this.jumpDelay, this.scaleNumber));
        }
      },
      run: function run() {
        console.log("\u5954\u8dd1");
        this.state = "run";
        this.node.getComponent(cc.Animation).play("king");
      },
      jumpRelease: function jumpRelease() {
        console.log("\u6062\u590d\u5954\u8dd1");
        if ("run" != this.state) {
          this.state = "run";
          1 != this.node.scale && this.node.runAction(cc.scaleTo(this.jumpDelay, 1));
          this.getComponent(cc.Animation).play("king");
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Over: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b29383X4J9HObMlTJtlrV8Y", "Over");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      reStart: function reStart() {
        console.log("\u70b9\u51fb\u6309\u94ae\uff1arestart");
        cc.director.loadScene("game");
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "Boom", "Game", "King", "Over" ]);