export interface IGlobalState {
  position: {
    latitude?: number;
    longitude?: number;
  };
  activeNPC?: number;
  camActive?: boolean;
  on?: boolean;
  follow?: boolean;
  objectArray?: any[];
}

export const globalState: IGlobalState = {
  position: { latitude: undefined, longitude: undefined },
  activeNPC: -1,
  camActive: false,
  on: false,
  follow: true,
  objectArray: undefined,
};
