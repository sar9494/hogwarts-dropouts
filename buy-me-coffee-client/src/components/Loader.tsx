import { ReactNode } from "react";

type LoaderProps = {
  children: ReactNode;
  loading?: boolean;
};
type SmallLoader = {
  children: ReactNode;
  loading?: boolean;
};

export const Loader = ({ loading, children }: LoaderProps) => {
  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <img src="https://s3-alpha-sig.figma.com/img/07f9/97c5/b22f6bc9ba535eec9efcdd0bacb3bb4d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RVZlgTF6mUtalHooEWzMyYfM0RgAC90fdGSXBtxoXzCaWiMx1OwKNvEuhBZneVMa2Javz1blckCYcaoiQLyVwAjunKFlb5X5iHOaH9IPnaAUCpxYUaWwDkD8ATVuV9McSLVXQJqS1FPMS1PvmkzYDUZ3n5T8pxGNmBeYyLMd2v~JYlHAaEpePhO5h3xbPJafLXnq91XrGvuQCPPOcLXQZvPQdnqz1F-MugK4H3N~u7AjGkajbLu1wCfWyNaomxgQUGaHsFX8SUF3alEaKnDd73cJpsHgod0vXTQyZLudW78ekgKa01d1H7FdBPdf67K5Dvw0cUjkw6i1q4uK6av9Pw__" />
    </div>
  ) : (
    children
  );
};

export const SmallLoader = ({ loading, children }: SmallLoader) => {
  return loading ? (
    <div className="flex items-center justify-center h-[300px]">
      <img src="https://s3-alpha-sig.figma.com/img/07f9/97c5/b22f6bc9ba535eec9efcdd0bacb3bb4d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RVZlgTF6mUtalHooEWzMyYfM0RgAC90fdGSXBtxoXzCaWiMx1OwKNvEuhBZneVMa2Javz1blckCYcaoiQLyVwAjunKFlb5X5iHOaH9IPnaAUCpxYUaWwDkD8ATVuV9McSLVXQJqS1FPMS1PvmkzYDUZ3n5T8pxGNmBeYyLMd2v~JYlHAaEpePhO5h3xbPJafLXnq91XrGvuQCPPOcLXQZvPQdnqz1F-MugK4H3N~u7AjGkajbLu1wCfWyNaomxgQUGaHsFX8SUF3alEaKnDd73cJpsHgod0vXTQyZLudW78ekgKa01d1H7FdBPdf67K5Dvw0cUjkw6i1q4uK6av9Pw__" />
    </div>
  ) : (
    children
  );
};
