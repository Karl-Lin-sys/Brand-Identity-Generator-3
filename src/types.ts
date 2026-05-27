/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorInfo {
  hex: string;
  name: string;
  usage: string;
}

export interface FontPairing {
  heading: {
    family: string;
    weight: string;
    styles: string[];
  };
  body: {
    family: string;
    weight: string;
    styles: string[];
  };
  visualDescription: string;
}

export interface BrandIdentity {
  name: string;
  mission: string;
  voice: string;
  palette: ColorInfo[];
  typography: FontPairing;
  logoPrompts: {
    primary: string;
    secondary: string;
    icon: string;
  };
}

export interface BrandAssets {
  primaryLogoSvg: string;
  secondaryMarkSvg: string;
  iconSvg: string;
}

export interface BrandBible extends BrandIdentity {
  assets: BrandAssets;
}
