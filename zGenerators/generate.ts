// generate controller
// generate service 
// generate module

import * as fs from 'fs-extra';
import { GModule } from './types';
import config from './config';
import * as path from 'path';
import { format } from './helpers';
const { root } = config;

(async () => {
  let modules: GModule[] = [
    {
      name: 'actor',
      plural: 'actors',
      modelName: 'Actor',
    },
    {
      name: 'ageRule',
      plural: 'ageRules',
      modelName: 'AgeRule',
    },
    {
      name: 'cinema',
      plural: 'cinemas',
      modelName: 'Cinema',
    },
    {
      name: 'comment',
      plural: 'comments',
      modelName: 'Comment',
    },
    {
      name: 'film',
      plural: 'films',
      modelName: 'Film',
    },
    {
      name: 'genre',
      plural: 'genres',
      modelName: 'Genre',
    },
    {
      name: 'hall',
      plural: 'halls',
      modelName: 'Hall',
    },
    {
      name: 'news',
      plural: 'news',
      modelName: 'News',
    },
    {
      name: 'shop',
      plural: 'shops',
      modelName: 'Shop',
    },
    {
      name: 'shopItem',
      plural: 'shopItems',
      modelName: 'ShopItem',
    },
    {
      name: 'ticket',
      plural: 'tickets',
      modelName: 'Ticket',
    },
  ]
    .map((m: GModule) => {
      if (!m.uppercaseName) {
        m.uppercaseName = m.name[0].toUpperCase() + m.name.slice(1);
      }
      return m;
    });

  // load templates
  const controllerTemplate = (await fs.readFile(`${path.resolve(__dirname, 'templates/controller.tmp')}`)).toString();
  const serviceTemplate = (await fs.readFile(`${path.resolve(__dirname, 'templates/service.tmp')}`)).toString();
  const moduleTemplate = (await fs.readFile(`${path.resolve(__dirname, 'templates/module.tmp')}`)).toString();

  for (const m of modules) {
    const { name, modelName, uppercaseName } = m;

    // generate controller
    const controller = {
      name: `${name}.controller.ts`,
      content: format(controllerTemplate, {
        ...m,
      }),
    };

    // save controller
    await fs.writeFile(`${path.resolve(root, 'src', name, `${name}.controller.ts`)}`, controller.content);

    // generate service
    const service = {
      name: `${name}.service.ts`,
      content: format(serviceTemplate, {
        ...m,
      }),
    };
    // save service
    await fs.writeFile(`${path.resolve(root, 'src', name, `${name}.service.ts`)}`, service.content);

    // generate module
    const zmodule = {
      name: `${name}.module.ts`,
      content: format(moduleTemplate, {
        ...m,
      }),
    };
    // save module
    await fs.writeFile(`${path.resolve(root, 'src', name, `${name}.module.ts`)}`, zmodule.content);
  }
})();
