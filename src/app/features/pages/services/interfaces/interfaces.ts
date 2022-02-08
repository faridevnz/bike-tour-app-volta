interface IButton {
  text: string;
  role?: 'cancel' | 'destructive' | string;
  cssClass?: string | string[];
  handler?: (value: any) =>
    | boolean
    | void
    | {
        [key: string]: any;
      };
}

interface IToken {
  token: string
}

interface IBikeInfo {
  IdPosizione: number,
  Targa: string,
  Latitudine: number,
  Longitudine: number,
  Quadro: string,
  Geocode: string,
  Speed: number,
  Timestamp: any, //TODO:
  Errore: any
}

interface IDataScanner {
  id: string,
  targa: string
}

export { IButton, IToken, IBikeInfo, IDataScanner };
