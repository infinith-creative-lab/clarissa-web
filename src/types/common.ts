export type CommonProps = {
  className?: string;
  children?: React.ReactNode;
};

export type WithLocale = {
  locale: string;
};

export type PageProps = {
  params: Promise<{ locale: string }>;
};

export type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
