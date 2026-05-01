import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent py-10 px-12 mt-auto border-t border-muted-lavender/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Texte de gauche : Branding & Copyright */}
        <div className="space-y-1">
          <h3 className="text-brand-blue font-serif font-bold text-lg">Dourous-Net</h3>
          <p className="text-muted-slate text-xs">
            © {currentYear} Dourous-Net Academic Extranet. Preserving intellectual heritage.
          </p>
        </div>

        {/* Liens de droite : Navigation secondaire */}
        <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold text-muted-slate tracking-widest uppercase">
          <a href="#" className="hover:text-brand-blue transition-colors">Institutional Access</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Archive Guidelines</a>
        </div>

      </div>
    </footer>
  );
}