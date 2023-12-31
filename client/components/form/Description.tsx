interface DescriptionProps {
  id: string;
  children: React.ReactNode;
}

export const Description: React.FC<DescriptionProps> = ({ id, children }) => {
  return (
    <span id={id} className='text-sm text-gray-500'>
      {children}
    </span>
  );
};
