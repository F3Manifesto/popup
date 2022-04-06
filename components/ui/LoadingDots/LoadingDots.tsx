import s from './LoadingDots.module.css'

interface props {
  className?: string
  large?: boolean
}

const LoadingDots: React.FC<props> = ({ className, large }) => {
  return (
    <span className={[s.root, className, large ? s.large : ''].join(' ')}>
      <span />
      <span />
      <span />
    </span>
  )
}

export default LoadingDots
