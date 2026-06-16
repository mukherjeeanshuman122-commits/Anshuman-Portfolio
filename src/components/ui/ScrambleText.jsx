import { useScramble } from '../../hooks/useScramble'

export default function ScrambleText({ text, className = '', as: Tag = 'span' }) {
  const { display, scramble } = useScramble(text)

  return (
    <Tag
      className={className}
      onMouseEnter={scramble}
    >
      {display}
    </Tag>
  )
}
