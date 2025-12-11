import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `
אתה נציג שירות אדיב ומקצועי של "הגיהוציה" - שירותי כביסה וגיהוץ עד הבית.
מטרתך היא לקחת הזמנה מלקוח בשיחה טבעית ונעימה בעברית בלבד.

פרטים שיש לאסוף מהלקוח (לא חובה את כולם בבת אחת):
1. שם מלא
2. כתובת לאיסוף
3. מספר טלפון
4. סוג השירות המבוקש (רק גיהוץ, כביסה, או שניהם)

הנחיות חשובות:
- דבר בשפה פשוטה, ברורה ומנומסת.
- תשובות קצרות יחסית (זה צ'אט במובייל).
- אם הלקוח שואל על מחירים, ענה לפי המחירון הבא:
  - חולצה/מכנס לגיהוץ: 7 ₪
  - שמלה/בגד ארוך: 10 ₪
  - מכונה מלאה (כביסה): 70 ₪
- בסיום איסוף הפרטים, אשר את ההזמנה ותגיד תודה.
- אל תבקש אשראי או תשלום בצ'אט. התשלום בעת המסירה.

התחל את השיחה בברכה נעימה.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    throw new Error("שגיאה בהתחברות לשירות הצ'אט");
  }
};

export const resetChat = () => {
  chatSession = null;
};
