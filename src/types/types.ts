import { MODAL_SIDES } from '../constants/modal.constants'

export type ModalSides = (typeof MODAL_SIDES)[keyof typeof MODAL_SIDES]
