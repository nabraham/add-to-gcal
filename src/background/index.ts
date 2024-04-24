// Copyright 2024 Nathan Abraham
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { parsers } from "./parsers/index.js";

var pad = (num: number) => {
    let s = '' + num;
    return s.length === 1 ? '0' + s : s;
};

var createEventUrl = (date: Date, tab?: chrome.tabs.Tab) => {
    let dateStr = [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate()),
        'T',
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds())
    ].join('')

    return [
        'https://calendar.google.com/calendar/u/0/r/eventedit?dates=',
        dateStr, '/', dateStr, '&',
        'ctz=', Intl.DateTimeFormat().resolvedOptions().timeZone, '&',
        'text=', tab?.title ?? 'TITLE', '&',
        'location=', tab?.url ?? 'URL'
    ].join('');
};

var onClick = (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
    let selected = info.selectionText || '';

    let urls = parsers.map(parser => {
        let groups = parser.group(selected);
        if (groups) {
            return {
                name: parser.name,
                url: createEventUrl(parser.format(groups), tab)
            };
        }
        return undefined;
    }).filter(x => !!x);

    if (urls.length && urls[0]) {
        chrome.tabs.create({ url: urls[0].url });
    } else {
        chrome.tabs.create({ url: 'assets/error.html' });
    }

};

chrome.contextMenus.onClicked.addListener(onClick);
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      title: 'Add to Google Calendar',
      contexts: ['selection'],
      id: 'selection'
    });
});