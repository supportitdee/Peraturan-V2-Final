export default {
    async query() {
        const response = await fetch(
            "https://flowise.cptsnj.online/api/v1/prediction/515bcfbb-32ab-4878-a59b-b425d96c4c6a",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: cari_judul_baru.text })  // Mengambil nilai dari widget input
            }
        );
        const result = await response.json();
        return result;
    }
};
