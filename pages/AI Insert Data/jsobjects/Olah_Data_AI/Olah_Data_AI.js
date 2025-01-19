export default {
    async query() {
        const response = await fetch(
            "https://flowise.cptsnj.online/api/v1/prediction/515bcfbb-32ab-4878-a59b-b425d96c4c6a",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: input_data_user.text })  // Mengambil nilai dari widget input
            }
        );
        let parsedText = {};

        try {
            const result = await response.json();
            const cleanedText = result.text.replace(/```json|\n```/g, "");
            parsedText = JSON.parse(cleanedText);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return {};  // Mengembalikan objek kosong jika terjadi kesalahan
        }

        // Menyimpan kolom-kolom yang dibutuhkan ke dalam temporary variables (store)
        storeValue("judul_peraturan", parsedText.tabel_peraturan?.judul_peraturan || "Judul Peraturan Tidak Tersedia");
        storeValue("deskripsi", parsedText.tabel_peraturan?.deskripsi || "Deskripsi Tidak Tersedia");

        // Menyimpan tabel_bab yang terdiri dari beberapa bab ke dalam store
        if (Array.isArray(parsedText.tabel_bab) && parsedText.tabel_bab.length > 0) {
            parsedText.tabel_bab.forEach((item, index) => {
                storeValue(`judul_bab_${index}`, item.judul_bab || `Judul Bab ${index + 1} Tidak Tersedia`);
                storeValue(`isi_bab_${index}`, item.isi_bab || `Isi Bab ${index + 1} Tidak Tersedia`);
            });
        } else {
            storeValue("judul_bab_0", "Judul Bab Tidak Tersedia");
            storeValue("isi_bab_0", "Isi Bab Tidak Tersedia");
        }

        // Mengembalikan hasil untuk digunakan lebih lanjut
        return parsedText;
    }
};
