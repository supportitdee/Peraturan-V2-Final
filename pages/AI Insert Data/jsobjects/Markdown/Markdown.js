export default {
    generateMarkdown() {
        // Mengambil data dari hasil query sebelumnya
        const judul_peraturan = Olah_Data_AI.query.data.peraturan.judul_peraturan || "Judul Peraturan Tidak Tersedia";
        const deskripsi = Olah_Data_AI.query.data.peraturan.deskripsi || "Deskripsi Tidak Tersedia";

        // Membuat header judul peraturan
        let markdown = `Judul Peraturan : ${judul_peraturan}\n\n`;

        // Menambahkan deskripsi peraturan
        markdown += `Deskripsi : ${deskripsi || "Deskripsi Tidak Tersedia"}\n\n`;

        // Menambahkan bab-bab, jika tersedia
        const babData = Olah_Data_AI.query.data.bab || [];
        if (babData.length > 0) {
            babData.forEach((item, index) => {
                const judul_bab = item.judul_bab || `Judul Bab ${index + 1} Tidak Tersedia`;
                const isi_bab = item.isi_bab || `Isi Bab ${index + 1} Tidak Tersedia`;

                // Menambahkan judul bab dengan keterangan "Bab X :"
                markdown += `Bab ${index + 1} : ${judul_bab}\n\n`;
                markdown += `${isi_bab}\n\n`;

                // Menambahkan subbab, jika ada
                const subbabData = item.subbab || [];
                if (subbabData.length > 0) {
                    subbabData.forEach((subbab, subIndex) => {
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
