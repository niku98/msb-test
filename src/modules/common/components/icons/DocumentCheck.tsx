interface DocumentCheckProps {
  className?: string;
}

const DocumentCheck = ({ className }: DocumentCheckProps) => {
  return (
    <svg
      width="0.8em"
      height="1em"
      viewBox="0 0 26 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.3554 6.69L18.642 1.97667C18.017 1.3515 17.1693 1.00019 16.2854 1H4.33202C3.44797 1 2.60012 1.35119 1.975 1.97631C1.34988 2.60143 0.998688 3.44928 0.998688 4.33333V27.6667C0.998688 28.5507 1.34988 29.3986 1.975 30.0237C2.60012 30.6488 3.44797 31 4.33202 31H20.9987C21.8827 31 22.7306 30.6488 23.3557 30.0237C23.9808 29.3986 24.332 28.5507 24.332 27.6667V9.04667C24.3318 8.16268 23.9805 7.31498 23.3554 6.69Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1667 24C16.3088 24 19.6667 20.6421 19.6667 16.5C19.6667 12.3579 16.3088 9 12.1667 9C8.02452 9 4.66666 12.3579 4.66666 16.5C4.66666 20.6421 8.02452 24 12.1667 24Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 15L11.5406 18L9.66666 16.2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DocumentCheck;
