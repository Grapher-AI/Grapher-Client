import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import {cells, parseResponse} from "@/jointjs-stuff/jointJSON";

const test = `Сформируй алгоритм сбора яблок в моем саду с деревьями`;
// const test = `Please help with clean my apartment`;

export default async function requestGraphSchema(prompt: string = test) {
  console.log("Request Graph Schema", prompt);
  // const openai = new OpenAI();

  const completion = await openai.beta.chat.completions.parse({
    // model: "gpt-4o-2024-08-06",
    model: "gpt-4o-2024-11-20",
    // model: 'o1-preview',
    messages: [
      { role: "assistant", language: "ru-RU", content: "Ты говоришь и понимаешь на русском языке. Ответ должен быть представлен в виде массива на основе которого будет построена блоксхемы, ты можешь использовать определенный набор типов ['customShapes.BeginShape','customShapes.EndShape','customShapes.ProcedureShape','customShapes.ConditionShape','customShapes.conditionOuterLink','customShapes.defaultLink'] помести нужный в поле type. Операции опиши в ProcedureShape, условия в ConditionShape, начало в BeginShape, конец в EndShape, связывай их с помощью DefaultLink, но исходящие связи от ConditionShape всегда должный быть ConditionOuterLink, свойства target и source являются опциональными и могут быть использованы только для связей(customShape.defaultLink, customShape.conditionOuterLink). Каждый элемент должен быть связан." },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(cells, "messageCells"),
  });

  const messageCells = completion.choices[0].message.parsed;

  if(!messageCells?.cells){
    return Promise.reject(new Error('cant find cells property'));
  }
  console.log('messageCells',messageCells)
  console.log('parsed', parseResponse(messageCells?.cells))

  return parseResponse(messageCells?.cells);
}
