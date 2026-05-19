export default function StyledHeading({ text, word }: { text: string; word: string }) {
  const i = text.indexOf(word);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="font-display text-gold">{word}</span>
      {text.slice(i + word.length)}
    </>
  );
}
