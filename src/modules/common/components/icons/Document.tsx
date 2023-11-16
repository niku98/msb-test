interface DocumentProps {
  className?: string;
}

const Document = ({ className }: DocumentProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <rect width="40" height="40" fill="white" />
      <path
        d="M31.8696 10.2018L28.1346 6.46685C27.6702 6.00183 27.1186 5.63293 26.5115 5.38127C25.9043 5.1296 25.2535 5.0001 24.5963 5.00018H11.668C10.3419 5.00018 9.07012 5.52697 8.13243 6.46465C7.19475 7.40233 6.66797 8.6741 6.66797 10.0002V30.0002C6.66797 31.3263 7.19475 32.598 8.13243 33.5357C9.07012 34.4734 10.3419 35.0002 11.668 35.0002H28.3346C29.6607 35.0002 30.9325 34.4734 31.8702 33.5357C32.8079 32.598 33.3346 31.3263 33.3346 30.0002V13.7385C33.3347 13.0817 33.2054 12.4313 32.954 11.8244C32.7026 11.2176 32.3342 10.6662 31.8696 10.2018Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.0013 14.1668H27.5013C26.6172 14.1668 25.7694 13.8156 25.1443 13.1905C24.5192 12.5654 24.168 11.7176 24.168 10.8335V3.3335"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.6693 27.5H13.3359"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3359 21.667H26.6693"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8359 15.8335H13.3359"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Document;
