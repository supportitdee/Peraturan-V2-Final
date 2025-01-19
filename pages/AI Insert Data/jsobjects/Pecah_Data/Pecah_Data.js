export default {
  currentBabIndex: 0,  // Menyimpan index bab yang sedang diproses
  currentSubbabIndex: 0,  // Menyimpan index subbab yang sedang diproses

  // Fungsi untuk mendapatkan data per bab atau subbab berdasarkan index
  async processDataForForm() {
    const judulPeraturan = Olah_Data_AI.query.data.tabel_peraturan.judul_peraturan || "Judul Peraturan Tidak Tersedia";
    const deskripsi = Olah_Data_AI.query.data.tabel_peraturan.deskripsi || "Deskripsi Tidak Tersedia";

    // Menyiapkan formData untuk data yang akan diproses
    const formData = {
      judul_peraturan: judulPeraturan,
      deskripsi: deskripsi,
      bab: []  // Array untuk menampung bab-bab
    };

    if (Array.isArray(Olah_Data_AI.query.data.tabel_bab)) {
      console.log('Tabel Bab:', Olah_Data_AI.query.data.tabel_bab);  // Menampilkan tabel bab yang diterima
      
      // Mengambil setiap bab dan subbab
      for (let i = 0; i < Olah_Data_AI.query.data.tabel_bab.length; i++) {
        const bab = Olah_Data_AI.query.data.tabel_bab[i];
        const babData = {
          id: `bab_${i}`,
          judul_bab: bab.judul_bab || `Judul Bab ${i + 1}`,
          isi_bab: bab.isi_bab || `Isi Bab ${i + 1}`,
          subbab: []  // Menampung subbab
        };

        // Mengambil data subbab jika ada
        if (Array.isArray(bab.subbab)) {
          console.log(`Subbab pada bab ${i}:`, bab.subbab);  // Menampilkan subbab bab yang sedang diproses
          
          for (let j = 0; j < bab.subbab.length; j++) {
            const subbab = bab.subbab[j];
            babData.subbab.push({
              id: `subbab_${i}_${j}`,
              judul_subbab: subbab.judul_subbab || `Judul Subbab ${j + 1}`,
              isi_subbab: subbab.isi_subbab || `Isi Subbab ${j + 1}`
            });
          }
        }

        // Menambahkan babData ke dalam formData
        formData.bab.push(babData);
      }
    }

    console.log('Form Data:', formData);  // Menampilkan data yang akan diproses

    return formData;
  },

  // Fungsi untuk mengambil data bab dan subbab sesuai index
  getNextData(formData) {
    let nextData = null;

    // Cek apakah masih ada bab yang bisa diambil
    if (this.currentBabIndex < formData.bab.length) {
      const currentBab = formData.bab[this.currentBabIndex];

      // Jika masih ada subbab pada bab ini
      if (this.currentSubbabIndex < currentBab.subbab.length) {
        nextData = currentBab.subbab[this.currentSubbabIndex];
        this.currentSubbabIndex++;  // Pindah ke subbab berikutnya
      } else {
        // Jika subbab habis, pindah ke bab berikutnya
        this.currentBabIndex++;
        this.currentSubbabIndex = 0;  // Reset subbab index
        nextData = currentBab;
      }
    }

    // Jika sudah tidak ada bab, reset index
    if (this.currentBabIndex >= formData.bab.length) {
      this.currentBabIndex = 0;
      this.currentSubbabIndex = 0;
    }

    console.log('Next Data:', nextData);  // Menampilkan data yang akan dikirim ke form

    return nextData;
  },

  // Fungsi untuk mengisi form berdasarkan data yang telah diproses
  populateForm(formData) {
    const nextData = this.getNextData(formData);

    if (nextData) {
      if (nextData.judul_bab) {
        // Misalnya mengisi form untuk bab
        console.log('Mengisi Form Bab:', nextData);  // Debug untuk bab
        setValue(`bab_judul_${this.currentBabIndex}`, nextData.judul_bab);
        setValue(`bab_isi_${this.currentBabIndex}`, nextData.isi_bab);
      }

      if (nextData.judul_subbab) {
        // Misalnya mengisi form untuk subbab
        console.log('Mengisi Form Subbab:', nextData);  // Debug untuk subbab
        setValue(`subbab_judul_${this.currentBabIndex}_${this.currentSubbabIndex}`, nextData.judul_subbab);
        setValue(`subbab_isi_${this.currentBabIndex}_${this.currentSubbabIndex}`, nextData.isi_subbab);
      }
    }
  }
};
