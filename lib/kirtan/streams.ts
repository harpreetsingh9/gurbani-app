export interface LiveStream {
  id: string;
  title: string;
  location: string;
  streamUrl: string;
  source: string;
  description?: string;
  isPrimary?: boolean;
}

export const LIVE_STREAMS: LiveStream[] = [
  {
    id: "sgpc-amritsar",
    title: "Sri Harmandir Sahib",
    location: "Amritsar, Punjab",
    streamUrl: "https://live.sgpc.net:8442/",
    source: "Official SGPC Live Broadcast",
    description: "Live Gurbani Kirtan 24/7 directly from Sachkhand Sri Harmandir Sahib (Golden Temple).",
    isPrimary: true,
  },
  {
    id: "hazur-sahib",
    title: "Takht Sri Hazur Sahib",
    location: "Nanded, Maharashtra",
    streamUrl: "https://live.sgpc.net:8442/", // Extensible fallback / secondary stream
    source: "Takht Hazur Sahib",
    description: "Live Gurbani Kirtan broadcast from Sachkhand Sri Hazur Abchalnagar Sahib.",
  },
  {
    id: "bangla-sahib",
    title: "Gurdwara Bangla Sahib",
    location: "New Delhi",
    streamUrl: "https://live.sgpc.net:8442/", // Extensible fallback / secondary stream
    source: "DSGMC Broadcast",
    description: "Live Kirtan & Nitnem prayers from Gurdwara Bangla Sahib.",
  },
];
