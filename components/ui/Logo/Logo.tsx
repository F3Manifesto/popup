const Logo = ({ className = '', ...props }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 37 37"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect width="100%" height="100%" />
    <path
      d="M18.3125 10.6094L28.4688 0.453125H36.0859V8.07031L25.9297 18.2266L36.0859 28.3828V36H28.4688L18.3125 25.8438L8.15625 36H0.539062V28.3828L10.6953 18.2266L0.539062 8.07031V0.453125H8.15625L18.3125 10.6094Z"
      fill="black"
    />
  </svg>
)

export default Logo
