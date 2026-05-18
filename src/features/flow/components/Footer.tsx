import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-1 py-6">
      <div className="relative h-10 w-10 opacity-50">
        <Image
          fill
          sizes="40px"
          alt="LaudWell"
          src="/laudwell-logo.png"
          className="object-contain"
        />
      </div>
      <span className="text-[10px] font-light tracking-widest text-stone-500 uppercase">
        Powered by LaudWell
      </span>
    </footer>
  );
}
