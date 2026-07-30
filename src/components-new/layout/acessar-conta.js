import Image from "next/image";
import Link from "next/link";

export default function AcessarConta() {
  return (
    <div className="flex items-center">
      <figure className="mb-0 flex items-center mr-3 w-4">
        <Image src="/public-new/icons/layout/footer/user.svg" width={16} height={16} />
      </figure>
      <Link href="/login" className="typ-p-sm text-orange underline">
        
          Acessar minha conta
        
      </Link>
    </div>
  );
}
