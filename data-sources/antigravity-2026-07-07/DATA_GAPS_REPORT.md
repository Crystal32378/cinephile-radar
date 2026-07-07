# 影迷觀影雷達資料完整度與缺口分析報告 (Data Gaps Report)

此報告彙整了奧斯卡最佳影片、坎城金棕櫚、威尼斯金獅、柏林金熊四大影展完整歷史得獎名單的資料缺口與中文片名查證進度。

## 1. 資料庫完整度統計 (Database Completeness Summary)

- **總收錄電影數**: 378 部
- **已確認譯名 (confirmed)**: 238 部
- **需要來源查證 (needs_source)**: 30 部
- **待查證/無譯名 (pending)**: 110 部

### 各影展缺口統計 (Missing Chinese Titles by Festival)
- **OSCAR**: 待補齊/查證中文片名共 1 部
- **CANNES**: 待補齊/查證中文片名共 34 部
- **VENICE**: 待補齊/查證中文片名共 36 部
- **BERLIN**: 待補齊/查證中文片名共 39 部

## 2. 早期電影中文片名查證清單 (Early Title Verification Needed)

由於早期電影（奧斯卡 1960 年前，其餘影展 1970 年前）在台灣常無正式發行紀錄，或有多個不同翻譯，以下電影需要進一步對照台灣歷史報紙或發行商資料：

| 影展 | 年份 | 英文片名 | 目前中文候選 | 狀態 | 備註 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| OSCAR | 1927 | Wings | 飛機大戰「翼」 | needs_source | Wikidata: Q272036 |
| OSCAR | 1928 | The Broadway Melody | 百老滙之歌 | needs_source | Wikidata: Q463620 |
| OSCAR | 1930 | Cimarron | 殖邊壯史 | needs_source | Wikidata: Q251997 |
| OSCAR | 1931 | Grand Hotel | 逆旅奇觀 | needs_source | Wikidata: Q246656 |
| OSCAR | 1932 | Cavalcade | 百戰忠魂 | needs_source | Wikidata: Q753107 |
| OSCAR | 1935 | Mutiny on the Bounty | 叛艦喋血記 | needs_source | Wikidata: Q329709 |
| OSCAR | 1936 | The Great Ziegfeld | 歌舞大王昔飛路 | needs_source | Wikidata: Q470218 |
| OSCAR | 1937 | The Life of Emile Zola | 左拉光榮傳 | needs_source | Wikidata: Q738552 |
| OSCAR | 1938 | You Can't Take It with You | 浮生若夢 | needs_source | Wikidata: Q637835 |
| OSCAR | 1940 | Rebecca | 蝴蝶梦 | needs_source | Wikidata: Q204212 |
| OSCAR | 1941 | How Green Was My Valley | 父慈子孝 | needs_source | Wikidata: Q244448 |
| OSCAR | 1942 | Mrs. Miniver | 戰雲鵑血 | needs_source | Wikidata: Q478371 |
| OSCAR | 1944 | Going My Way | 与我同行 | needs_source | Wikidata: Q468877 |
| OSCAR | 1947 | Gentleman's Agreement | 君子協定 | needs_source | Wikidata: Q898840 |
| OSCAR | 1949 | All the King's Men | 當代奸雄 | needs_source | Wikidata: Q817159 |
| OSCAR | 1952 | The Greatest Show on Earth | 戲王之王 | needs_source | Wikidata: Q641061 |
| CANNES | 1946 | Brief Encounter | 偷情記 | pending | Wikidata: Q814296; Cannes 1946 tied winner (Grand Prix du Festival International du Film) |
| CANNES | 1946 | The Last Chance | 最後的機會 | pending | Wikidata: Q671940; Cannes 1946 tied winner (Grand Prix du Festival International du Film) |
| CANNES | 1946 | María Candelaria | 瑪利亞·康德萊麗亞 | pending | Wikidata: Q2578176; Cannes 1946 tied winner (Grand Prix du Festival International du Film) |
| CANNES | 1946 | Men Without Wings | 沒有翅膀的男人 | pending | Wikidata: Q2280650; Cannes 1946 tied winner (Grand Prix du Festival International du Film) |
| CANNES | 1946 | Neecha Nagar | 下層都市 | pending | Wikidata: Q427915; Cannes 1946 tied winner (Grand Prix du Festival International du Film) |
| CANNES | 1946 | Pastoral Symphony | 田園交響曲 | pending | Wikidata: Q2553634; Cannes 1946 tied winner (Grand Prix du Festival International du Film) |
| CANNES | 1946 | The Red Meadows | 大地將變成紅色 | pending | Wikidata: Q1757020; Cannes 1946 tied winner (Grand Prix du Festival International du Film) |
| CANNES | 1946 | Torment | 折磨 | pending | Wikidata: Q2290980; Cannes 1946 tied winner (Grand Prix du Festival International du Film) |
| CANNES | 1946 | The Turning Point | 轉折點（1945年電影） | pending | Wikidata: Q945852; Cannes 1946 tied winner (Grand Prix du Festival International du Film) |
| CANNES | 1947 | Antoine and Antoinette (Best Psychological & Love Film) | 安东与安东妮 | pending | Wikidata: Q2279661 |
| CANNES | 1947 | Crossfire (Best Social Film) | 雙雄鬥智 | pending | Wikidata: Q632718 |
| CANNES | 1947 | Dumbo (Best Animation Design) | 小飞象 | needs_source | Wikidata: Q40895 |
| CANNES | 1947 | The Damned (Best Adventure & Crime Film) | 詛咒合唱團 | pending | Wikidata: Q3233764 |
| CANNES | 1947 | Ziegfeld Follies (Best Musical Comedy) | 昔飛路歌舞團 | pending | Wikidata: Q2186004 |

> [!NOTE]
> 還有 66 部早期電影需要查證，完整清單請參閱 [early_title_verification_needed.csv](file:///Users/crystalchang/.gemini/antigravity/scratch/cinephile-radar/early_title_verification_needed.csv)。

## 3. 資料欄位完整性缺口 (Missing Metadata Gaps)

部分電影在 Wikidata 上缺乏導演或製片國家屬性，已自動使用原始資料補齊或標記：

### 缺乏導演資訊的電影 (Missing Director Claim):
- 無

### 缺乏國家資訊的電影 (Missing Country Claim):
- oscar 2001: A Beautiful Mind
