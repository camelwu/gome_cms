<template>
  <div class='tinymce-container editor-container'>
    <textarea class='tinymce-textarea' :id="id"></textarea>
  </div>
</template>

<script>
export default {
  name: 'tinymce',
  props: {
    id: {
      type: String,
      default: 'tinymceEditor'
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
         return ['removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code', 'bold italic blockquote | h2 p  media link | alignleft aligncenter alignright']
      }
    },
    data () {
      return {
        hasChange: false,
        hasInit: false
      }
    },
    menubar: {
      default: ''
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.id).setContent(val))
      }
    }
  },
  mounted () {
    const _this = this
    window.tinymce.init({
      selector: `#${this.id}`,
      menubar: false,
      plugins: ['textcolor colorpicker lists link'],
      toolbar: ' undo redo | bold italic forecolor | link unlink |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
      height: this.height,
      body_class: 'panel-body ',
      object_resizing: false,
      language: 'zh_CN',
      language_url: '/static/tinymce/langs/zh_CN.js',
      default_link_target: '_blank',
      link_title: false,
      init_instance_callback: editor => {
        if (_this.value) {
          editor.setContent(_this.value)
        }
        _this.hasInit = true
        editor.on('NodeChange Change KeyUp', () => {
          this.hasChange = true
          this.$emit('input', editor.getContent({ format: 'raw' }))
        })
      },
      setup (editor) {
        editor.addButton('h2', {
          title: '小标题', // tooltip text seen on mouseover
          text: '小标题',
          onclick () {
            editor.execCommand('mceToggleFormat', false, 'h2')
          },
          onPostRender () {
            const btn = this
            editor.on('init', () => {
              editor.formatter.formatChanged('h2', state => {
                btn.active(state)
              })
            })
          }
        })
        editor.addButton('p', {
          title: '正文',
          text: '正文',
          onclick () {
            editor.execCommand('mceToggleFormat', false, 'p')
          },
          onPostRender () {
            const btn = this
            editor.on('init', () => {
              editor.formatter.formatChanged('p', state => {
                btn.active(state)
              })
            })
          }
        })
      }
    })
  },
  destroyed () {
    window.tinymce.get(this.id).destroy()
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 15px;
  top: 18px;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
