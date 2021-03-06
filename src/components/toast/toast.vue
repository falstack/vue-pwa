<style lang="scss" scoped>

    .vue-pwa-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        z-index: 12;

        &.hidden {
            display: none;
        }

        .loading {
            padding: 15px;
            background-color: rgba(0,0,0,0.8);
            border-radius: 5px;
            color: #fff;
            text-align: center;
            text-overflow: ellipsis;
            font-size: 15px;
            opacity: 0;
            transition-duration: .3s;
            display: flex;
            justify-content: center;
            align-items: center;

            &.show {
                opacity: 1;
            }

            &.top {
                flex-direction: column;

                .tip {
                    padding-top: 10px;
                }
            }

            &.right {
                flex-direction: row-reverse;

                .tip {
                    padding-right: 10px;
                }
            }

            &.bottom {
                flex-direction: column-reverse;

                .tip {
                    padding-bottom: 10px;
                }
            }

            &.left {
                flex-direction: row;

                .tip {
                    padding-left: 10px;
                }
            }
        }

        .spinner svg {
            width: 28px;
            height: 28px;
            stroke: #FFF;
            fill: #FFF;
        }

        .tip {
            font-size: 14px;
            line-height: 14px;
        }

        .icon {
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
    }
</style>

<template>
    <div class="vue-pwa-container"
        :class="{ 'hidden' : !state } ">
        <div class="loading"
             :class="{ 'show' : state === 2, 'top' : showIcon && position === 0, 'right' : position === 1, 'bottom' : position === 2, 'left' : position === 3 }">
            <div v-if="showIcon" class="spinner">
                <div v-if="icon" class="icon" :style="{ backgroundImage: 'url(' + icon + ')' }"></div>
                <svg viewBox="0 0 64 64" v-else>
                    <g stroke-width="4" stroke-linecap="round">
                        <line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g>
                </svg>
            </div>
            <span v-if="tip" class="tip" v-html="tip"></span>
        </div>
    </div>
</template>

<script>

    function preventDefault(e) {
      e.preventDefault();
    }

    export default {
      data() {
        return {
          state: 0,
          position: 0,
          tip: '',
          icon: undefined,
          showIcon: true
        };
      },

      destroyed() {
        this.$el.parentNode.removeChild(this.$el);
      },

      methods: {
        show(opt) {
          this.tip = opt.tip;
          this.icon = opt.icon;
          this.showIcon = !!opt.showIcon;
          this.position = opt.position ? opt.position : 0;

          this.state = 1;

          setTimeout(() => {
            this.state = 2;
          }, 300);

          document.body.addEventListener('touchmove', preventDefault);
        },

        hide() {
          this.state = 1;

          setTimeout(() => {
            this.state = 0;
            this.$destroy();
          }, 300);

          document.body.removeEventListener('touchmove', preventDefault);
        },

        update(opt) {
          this.tip = opt.tip;
          this.icon = opt.icon;
          this.showIcon = !!opt.showIcon;
        },

        getState() {
          return this.state;
        }
      }
    };
</script>
