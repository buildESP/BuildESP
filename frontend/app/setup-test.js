import '@testing-library/jest-dom/vitest'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'
import 'vitest-axe/extend-expect'

// Crée une instance simulée de window (jsdom)
const { window } = new JSDOM()

// 🖼️ ResizeObserver mock
vi.stubGlobal('ResizeObserver', ResizeObserver)
window.ResizeObserver = ResizeObserver

// 👁️ IntersectionObserver mock
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
window.IntersectionObserver = IntersectionObserverMock

// 🔄 scroll methods mock
window.Element.prototype.scrollTo = () => {}
window.Element.prototype.scrollIntoView = () => {}

// 🕒 requestAnimationFrame mock
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60)

// 🖼️ createObjectURL mock
window.URL.createObjectURL = () => 'https://i.pravatar.cc/300'

window.URL.revokeObjectURL = () => {}

// 🧠 matchMedia mock (nécessaire pour Chakra UI + theme)
window.matchMedia = () => ({
  matches: false,
  media: '',
  onchange: null,
  addListener: () => {}, // deprecated
  removeListener: () => {}, // deprecated
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})

// 🧪 navigator.clipboard mock
Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
})

// ⬆️ Injecte les mocks dans globalThis
Object.assign(global, {
  window,
  document: window.document,
})
