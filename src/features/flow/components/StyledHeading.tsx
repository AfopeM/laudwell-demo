export default function StyledHeading({ text, word }: { text: string; word: string }) {
  const i = text.indexOf(word);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em style={{ color: '#9c8560', fontStyle: 'italic' }}>{word}</em>
      {text.slice(i + word.length)}
    </>
  );
}
