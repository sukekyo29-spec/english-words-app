extra_words = [
    ("absorb", "吸収する"), ("abstract", "抽象"), ("access", "接続"),
    ("accident", "偶然"), ("acid", "酸"), ("acquire", "取得する"),
    ("adapt", "適応する"), ("addiction", "依存"), ("adhere", "固執する"),
    ("adjacent", "隣の"), ("admire", "称賛する"), ("adolescent", "青年"),
    ("advance", "前進"), ("adverse", "不都合な"), ("advocate", "擁護する"),
    ("affect", "感情"), ("agenda", "議題"), ("aggression", "攻撃性"),
    ("agile", "機敏な"), ("agony", "苦悩"), ("aid", "援助"),
    ("alien", "異質な"), ("allocate", "割り当てる"), ("altar", "祭壇"),
    ("alter", "変える"), ("alumni", "卒業生"), ("ambiguous", "曖昧な"),
    ("amid", "〜の最中に"), ("ample", "十分な"), ("analogy", "類似"),
    ("anarchy", "無政府状態"), ("anchor", "固定する"), ("anger", "怒り"),
    ("animate", "活気づける"), ("antenna", "触角"), ("anxious", "不安な"),
    ("apathy", "無気力"), ("apologize", "謝る"), ("applause", "拍手"),
    ("apply", "適用する"), ("appoint", "任命する"), ("arbitrary", "恣意的な"),
    ("archive", "アーカイブ"), ("aspire", "熱望する"), ("assemble", "集める"),
    ("athlete", "アスリート"), ("autobiography", "自伝"), ("badge", "バッジ"),
    ("baffle", "当惑させる"), ("barrier", "障害物"), ("beacon", "灯台"),
    ("belonging", "所属感"), ("benchmark", "基準"), ("benign", "良性の"),
    ("bless", "祝福する"), ("blindness", "盲目"), ("blunt", "鈍い"),
    ("bond", "絆"), ("boundary", "境界"), ("boycott", "ボイコット"),
    ("brutal", "残忍な"), ("budget", "予算"), ("bureaucracy", "官僚制"),
    ("capability", "能力"), ("capture", "捕捉"), ("careless", "不注意な"),
    ("cash", "現金"), ("cease", "止む"), ("certainty", "確実性"),
    ("chaos", "混乱"), ("charity", "慈善"), ("chronic", "慢性的"),
    ("circulation", "循環"), ("clarity", "明確さ"), ("clash", "衝突する"),
    ("clergy", "聖職者"), ("climate", "風土"), ("closure", "閉鎖"),
    ("cluster", "集まり"), ("collaboration", "連携"), ("collapse", "崩壊"),
    ("comfort", "快適"), ("command", "命令"), ("compassion", "慈悲"),
    ("compatibility", "互換性"), ("compelling", "説得力のある"), ("complement", "補完"),
    ("compliance", "遵守"), ("complication", "合併症"), ("conceal", "隠す"),
    ("concede", "譲歩する"), ("concrete", "具体的な"), ("condemn", "非難する"),
    ("confine", "制限する"), ("conscience", "良心"), ("conspiracy", "陰謀"),
    ("contaminate", "汚染する"), ("contempt", "軽蔑"), ("controversy", "論争"),
    ("cope", "対処する"), ("core", "核心"), ("costly", "費用のかかる"),
    ("count", "重要である"), ("craft", "工芸"), ("crash", "衝突"),
    ("credibility", "信頼性"), ("critique", "批評"), ("crucial", "重大な"),
    ("curiosity", "好奇心"), ("custody", "親権"), ("cycle", "サイクル"),
    ("deadline", "締め切り"), ("debris", "残骸"), ("dedicate", "献身する"),
    ("defect", "欠陥"), ("deficit", "不足"), ("defy", "反抗する"),
    ("delegate", "委任する"), ("demolish", "取り壊す"), ("deny", "否定"),
    ("deprive", "奪う"), ("depth", "深さ"), ("desert", "見捨てる"),
    ("designate", "指定する"), ("desire", "欲望"), ("destination", "行き先"),
    ("distinguish", "区別する"), ("distribute", "分配する"), ("diverse", "多様な"),
    ("divert", "迂回させる"), ("domination", "支配"), ("donate", "寄付する"),
    ("doubt", "疑う"), ("drift", "漂う"), ("durable", "耐久性のある"),
    ("duty", "義務"), ("empathy", "共感"), ("empower", "力を与える"),
    ("enhance", "強化する"), ("enormous", "莫大な"), ("equality", "平等"),
    ("era", "時代"), ("erode", "侵食する"), ("evolve", "進化する"),
    ("exceed", "超える"), ("excess", "過剰"), ("excluding", "除く"),
    ("expectation", "予期"), ("expose", "さらす"), ("extinction", "絶滅"),
    ("fabricate", "でっち上げる"), ("flaw", "欠点"), ("flourish", "栄える"),
    ("fluctuate", "変動する"), ("foster", "育てる"), ("fragile", "もろい"),
    ("frustrate", "欲求不満にする"), ("fundamental", "根本的な"), ("fury", "激怒"),
    ("gap", "差"), ("grasp", "把握"), ("grieve", "悲しむ"),
    ("gross", "総計の"), ("guide", "導く"), ("harbor", "港湾"),
    ("harsh", "過酷な"), ("hazard", "危険"), ("healing", "癒し"),
    ("heritage", "文化遺産"), ("hierarchy", "階層"), ("highlight", "ハイライト"),
    ("hinder", "妨げる"), ("hostility", "敵意"), ("ideology", "イデオロギー"),
    ("impulse", "衝動"), ("inappropriate", "不適切な"), ("incompetent", "無能な"),
    ("inconsistent", "一貫性のない"), ("incredible", "信じがたい"), ("indulge", "耽る"),
    ("inevitable", "必然的な"), ("influence", "影響力"), ("initiative", "主導権"),
    ("inspire", "鼓舞する"), ("integral", "不可欠な"), ("integrity", "高潔"),
    ("intend", "意図する"), ("intrigue", "陰謀"), ("intuition", "直観"),
    ("justify", "正当化"), ("keen", "熱心な"), ("legitimate", "合法的な"),
    ("liability", "責任"), ("likelihood", "可能性"), ("linger", "残る"),
    ("logic", "論法"), ("loyalty", "忠誠心"), ("magnitude", "規模"),
    ("mandate", "任務"), ("manifest", "明白な"), ("manipulate", "操作する"),
    ("meditate", "瞑想する"), ("merit", "長所"), ("misconduct", "不正行為"),
    ("moderate", "中程度の"), ("momentum", "弾み"), ("monopoly", "独占"),
    ("morale", "士気"), ("naive", "素朴な"), ("negligence", "怠慢"),
    ("neutral", "中立"), ("objective", "目的"), ("obligation", "義務"),
    ("obscure", "不明瞭な"), ("optimal", "最適な"), ("optimism", "楽観"),
    ("originate", "起源を持つ"), ("outstanding", "傑出した"), ("paradox", "逆説"),
    ("peer", "仲間"), ("persistence", "忍耐"), ("pertinent", "適切な"),
    ("phenomena", "現象"), ("pragmatic", "現実的な"), ("precedent", "先例"),
    ("precision", "精度"), ("prejudice", "偏見"), ("pressure", "圧力"),
    ("prevail", "広まる"), ("primitive", "原始的な"), ("privilege", "特権"),
    ("probe", "調査する"), ("profound", "深い"), ("prosperity", "繁栄"),
    ("prototype", "原型"), ("provoke", "刺激する"), ("rational", "理性的な"),
    ("rationalize", "合理化する"), ("rebel", "反抗する"), ("reconcile", "和解する"),
    ("refine", "改良する"), ("regulate", "調整する"), ("reinstate", "復活させる"),
    ("relevance", "関連性"), ("reluctance", "気乗りしない"), ("remedy", "救済"),
    ("repercussion", "反響"), ("resign", "辞任する"), ("resilient", "弾力性のある"),
    ("restrain", "抑制する"), ("revert", "元に戻す"), ("rigid", "厳格な"),
    ("risk", "危険を冒す"), ("robust", "強固な"), ("sanction", "制裁"),
    ("sceptical", "懐疑的な"), ("scope", "範囲"), ("scrutinize", "精査する"),
    ("segment", "セグメント"), ("sensitive", "繊細な"), ("skeptical", "懐疑的な"),
    ("sophisticated", "高度な"), ("speculate", "推測する"), ("sphere", "領域"),
    ("spontaneous", "自発的な"), ("stance", "立場"), ("static", "静止した"),
    ("stimulate", "刺激する"), ("strive", "努力する"), ("subjective", "主観的な"),
    ("subtle", "微妙な"), ("surveillance", "監視"), ("sustain", "持続する"),
    ("systematic", "体系的な"), ("tactful", "機転のきいた"), ("tendency", "傾き"),
    ("transparent", "透明な"), ("turbulent", "激動の"), ("tyranny", "暴政"),
    ("unanimous", "全会一致の"), ("underlying", "根底にある"), ("undo", "元に戻す"),
    ("urgency", "緊急性"), ("validate", "有効化する"), ("vigorous", "活力に満ちた"),
    ("vital", "必要不可欠な"), ("vivid", "鮮明な"), ("vulnerable", "脆弱な"),
    ("wisdom", "知恵"), ("worthwhile", "やりがいのある"),
]

import re

with open("words.js", "r", encoding="utf-8") as f:
    content = f.read()

existing = set(re.findall(r'en: "([^"]+)"', content))
print(f"Existing words: {len(existing)}")

new_words = []
for en, ja in extra_words:
    if en not in existing:
        existing.add(en)
        new_words.append((en, ja))

print(f"New words to add: {len(new_words)}")

additional = "".join(f'  {{ en: "{en}", ja: "{ja}" }},\n' for en, ja in new_words)
content = content.rstrip().rstrip(";").rstrip("]").rstrip() + "\n" + additional + "];\n"

with open("words.js", "w", encoding="utf-8") as f:
    f.write(content)

total = len(re.findall(r'en: "', content))
print(f"Total words: {total}")
