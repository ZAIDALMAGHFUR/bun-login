export const users = [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" },
];

// Penyimpanan token sementara (gunakan database untuk produksi)
export const tokenStore: { [token: string]: number } = {};
