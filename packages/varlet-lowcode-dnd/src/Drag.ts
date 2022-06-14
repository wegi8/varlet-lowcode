import { defineComponent, DirectiveBinding, h, ref } from 'vue'
import type { PropType, Ref, Directive, Plugin, App } from 'vue'

export type DargStatus = 'drag' | 'none'

export default defineComponent({
  name: 'VarletLowDrag',

  props: {
    dragStyle: {
      type: Object as PropType<CSSStyleDeclaration>,
      default: () => ({}),
    },
    dragData: {
      type: Object as PropType<any>,
      default: undefined,
    },
    dragImg: {
      type: Element as PropType<HTMLImageElement | HTMLCanvasElement>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    type: {
      type: String as PropType<DataTransfer['effectAllowed']>,
      default: 'all',
    },
  },

  emits: ['dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop'],

  setup(props, ctx) {
    const { emit } = ctx
    const { dragStyle, dragData, dragImg, disabled, type } = props

    const dragStatus: Ref<DargStatus> = ref('none')

    const onDragStart = (e: DragEvent) => {
      dragImg && e.dataTransfer!.setDragImage(dragImg, 0, 0)
      dragStatus.value = 'drag'
      e.dataTransfer!.effectAllowed = type
      dragData && e.dataTransfer!.setData('text/plain', dragData)
      emit('dragstart', e)
    }

    const onDrag = (e: DragEvent) => {
      emit('drag', e)
    }

    const onDragEnter = (e: DragEvent) => {
      e.stopPropagation()
      emit('dragenter', e)
    }

    const onDragEnd = (e: DragEvent) => {
      dragStatus.value = 'none'
      emit('dragend', e)
    }

    const onDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    return () =>
      h(
        'div',
        {
          draggable: !disabled,
          style: dragStyle,
          onDragStart,
          onDrag,
          onDragOver,
          onDragEnter,
          onDragEnd,
        },
        ctx.slots.default?.()
      )
  },
})

interface DragOptions{
  dragStyle?: CSSStyleDeclaration
  dragData?: unknown
  dragImg?: HTMLImageElement | HTMLCanvasElement
  disabled?: boolean
  type?: DataTransfer["effectAllowed"]
}



function mounted(el: HTMLElement, props: DirectiveBinding<DragOptions>) {
  // el.addEventListener('dragstart', removeRipple, { passive: true })
  // document.addEventListener('touchend', el._ripple.removeRipple, { passive: true })
  // document.addEventListener('touchcancel', el._ripple.removeRipple, { passive: true })
}

function unmounted(el: HTMLElement, props: DirectiveBinding<DragOptions>) {

}

const VarletLowCodeDrag: Directive & Plugin = {
  mounted,
  unmounted,
  // updated,
  install(app: App) {
    app.directive('drag', this)
  },
}

// export const _RippleComponent = Ripple

// export default Ripple