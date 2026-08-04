import { Greeting } from './Greeting'

export function GreetingDemo() {
  return (
    <>
      <Greeting name="佐藤" role="デザイナー" />
      <Greeting name="鈴木" role="コーダー" />
      {/* role を渡さないと既定値「メンバー」になる */}
      <Greeting name="田中" />
    </>
  )
}
