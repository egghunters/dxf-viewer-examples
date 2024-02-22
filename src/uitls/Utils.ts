
import { ExamplesFileUrl } from '@/Consts'
import { Example } from '@/Defines'

export const fetchExamples = async () => {
  return new Promise<Example[]>((resolve) => {
    fetch(ExamplesFileUrl).then(response => response.json()).then(data => {
      resolve(data)
    })
  })
};
