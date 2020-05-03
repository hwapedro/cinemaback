import { Showtime, ShowtimeModel } from "~/showtime/showtime.model";
import { WhatIsIt } from "@typegoose/typegoose/lib/types";
import { Ticket } from "./ticket/ticket.model";
import { User } from "./user/user.model";
import { ShopItem } from "./shopItem/shopItem.model";
import { Shop } from "./shop/shop.model";
import { Cinema } from "./cinema/cinema.model";
import { News } from "./news/news.model";
import { Hall } from "./hall/hall.model";
import { HallCell } from "./hallCell/hallCell.model";
import { Genre } from "./genre/genre.model";
import { Film } from "./film/film.model";
import { AgeRule } from "./ageRule/ageRule.model";
import { Actor } from "./actor/actor.model";
import path from 'path';
import fs from 'fs-extra';
import { ADMIN_KEY } from "./common/decorators";

const filepath = path.resolve('.', 'frontentModels.js');

const classList: Function[] = [
  Shop,
  News,
  // Showtime,
  // Ticket,
  User,
  ShopItem,
  // Cinema,
  Hall,
  HallCell,
  Genre,
  Film,
  AgeRule,
  Actor,
];


let output: string = ``;

const pretty = (str: string) => str.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '');
const save = async () => {
  await fs.ensureDir(path.dirname(filepath));
  await fs.writeFile(filepath,
    pretty(`
export default {
  ${output}
}
`));
}
const toProperPlural = (str: string) => {
  return str[0].toLowerCase() + str.slice(1) + 's';
}
const configToModel = (target: any, field: string, fieldConfig: any): string => {
  // first of all -- metadata
  const data = Reflect.getMetadata(ADMIN_KEY, target.prototype, field);
  if (data && data.type)
    return `type: '${data.type}'`;
  if (field === 'image') {
    return `type: 'image'`;
  } else if (fieldConfig.Type === Date) {
    return `type: 'date'`;
  } else if (fieldConfig.Type === String) {
    return `type: 'field'`;
  } else if (fieldConfig.Type === Boolean) {
    return `type: 'checkbox'`;
  } else if (fieldConfig.Type === Number) {
    return `type: 'number'`;
  } else if (field === 'image') {
    return `type: 'image'`;
  } else if (fieldConfig.origOptions.ref) {
    if (fieldConfig.whatis === WhatIsIt.ARRAY) {
      // multiselect
      return `
type: 'multi',
arrays: [
  {
    name: '${field}',
    model: '${toProperPlural(fieldConfig.origOptions.ref)}',
    extractor: {
      name: (item, history, modelId, itemId) => \`\$\{item.name\}\`,
      key: (item) => item,
    },   
  }
],
`.trim();
    } else if (fieldConfig.whatis === WhatIsIt.NONE) {
      // single select
      return `
model: '${toProperPlural(fieldConfig.origOptions.ref)}',
extractor: {
  name: (item, history, modelId, itemId) => \`\$\{item.name\}\`,
  key: (item) => item,
},
`.trim();
    }
  }
  return null;
}



export const generate = async () => {
  output = '';
  for (const classType of classList) {
    console.log(
      classType.toString(),
      Reflect.getOwnMetadata('typegoose:properties', classType.prototype)
    );
    const className = classType.toString().match(/^class ([^ ]+)/)[1];
    let fieldsModels = '';
    const props: Map<string, any> = Reflect.getOwnMetadata('typegoose:properties', classType.prototype);
    for (const [field, fieldConfig] of props.entries()) {
      const fieldModel = configToModel(classType, field, fieldConfig);
      if (fieldModel) {
        fieldsModels += `{
name: '${field}',
${fieldModel}
},`;
        fieldsModels += '\n';
      }
    }
    output += `${toProperPlural(className)}: [
      ${fieldsModels}
    ],`;
    output += '\n';
  }
  await save();
}