function Footer() {
  return (
    <footer className="mt-12 border-t border-dashed py-6 text-center">
      <div className="text-muted-foreground container mx-auto text-xs">
        © {new Date().getFullYear()} Next Ecommerce. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
