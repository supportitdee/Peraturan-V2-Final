export default {
    generateMarkdown() {
        // Mengambil data dari hasil query sebelumnya
        const data = Olah_Data_AI.query.data.peraturan || {};
        const tabel_peraturan = data.tabel_peraturan || {};

        // Mengambil judul peraturan dan deskripsi
        const judul_peraturan = tabel_peraturan.judul_peraturan || "Judul Peraturan Tidak Tersedia";
        const deskripsi = tabel_peraturan.deskripsi || "Deskripsi Tidak Tersedia";

        // Membuat header judul peraturan
        let markdown = `Judul Peraturan : ${judul_peraturan}\n\n`;

        // Menambahkan deskripsi peraturan
        markdown += `Deskripsi : ${deskripsi}\n\n`;

        // Menambahkan bab-bab, jika tersedia
        const babData = Olah_Data_AI.query.data.tabel_bab || [];
        if (babData.length > 0) {
            babData.forEach((item, index) => {
                const judul_bab = Olah_Data_AI.query.data.bab || `Judul Bab ${index + 1} Tidak Tersedia`;
                const isi_bab = item.isi_bab || `Isi Bab ${index + 1} Tidak Tersedia`;

                // Menambahkan judul bab dengan keterangan "Bab X :"
                markdown += `Bab ${index + 1} : ${judul_bab}\n\n`;
                markdown += `${isi_bab}\n\n`;

                // Mengambil subbab berdasarkan bab tertentu
                const subbabData = Olah_Data_AI.query.data.subbab || [];
                const babId = item.id_bab;  // Misalnya, jika setiap bab memiliki ID yang menghubungkannya ke subbab
                const babSubbab = subbabData.filter(subbab => subbab.id_bab === babId); // Menyesuaikan dengan ID bab

                // Menambahkan subbab, jika ada
                if (babSubbab.length > 0) {
                    babSubbab.forEach((subbab, subIndex) => {
                        const judul_sub_bab = subbab.judul_sub_bab || `Subbab ${subIndex + 1} Tidak Tersedia`;
                        const isi_sub_bab = subbab.isi_sub_bab || `Isi Subbab ${subIndex + 1} Tidak Tersedia`;

                        // Menambahkan judul subbab dengan keterangan "Subbab X :"
                        markdown += `Subbab ${subIndex + 1} : ${judul_sub_bab}\n\n`;
                        markdown += `${isi_sub_bab}\n\n`;
                    });
                } else {
                    // Jika tidak ada subbab, tambahkan pesan default
                    markdown += "  - Tidak ada subbab.\n\n";
                }
            });
        } else {
            // Jika tidak ada bab, tampilkan pesan default
            markdown += "Tidak ada bab yang tersedia.\n";
        }

        // Mengembalikan hasil dalam format Markdown
        return markdown;
    }
};
