import { vi, test, it, describe, beforeEach } from "vitest";

// Mock Google Cloud Storage SDK



export const bucket = vi.fn().mockReturnValue({
    file: vi.fn().mockReturnValue({
      createReadStream: vi.fn(),
      createWriteStream: vi.fn(),
    }),
  });