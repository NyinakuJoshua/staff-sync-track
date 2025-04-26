
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6f83748b372f46ec860fb5e845cee2b7',
  appName: 'staff-sync-track',
  webDir: 'dist',
  server: {
    url: 'https://6f83748b-372f-46ec-860f-b5e845cee2b7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  }
};

export default config;
