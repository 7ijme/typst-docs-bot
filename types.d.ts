export type Root = Root2[];

export interface Root2 {
  route: string;
  title: string;
  description: string;
  part: string | null;
  outline: Outline[];
  body: Body;
  children: Root;
}

export interface Outline {
  id: string;
  name: string;
  children: Children[];
}

export interface Body {
  kind: string;
  content: any;
}

export interface Children {
  route: string;
  title: string;
  description: string;
  part?: string;
  outline: Outline[];
  body: Body;
  children: Children[];
}

export interface Outline2 {
  id: string;
  name: string;
  children: Children2[];
}

export interface Children2 {
  id: string;
  name: string;
  children: any[];
}

export interface Body2 {
  kind: string;
  content: any;
}

export interface Children3 {
  route: string;
  title: string;
  description: string;
  part: any;
  outline: Outline3[];
  body: Body3;
  children: any[];
}

export interface Outline3 {
  id: string;
  name: string;
  children: Children4[];
}

export interface Children4 {
  id: string;
  name: string;
  children: Children5[];
}

export interface Children5 {
  id: string;
  name: string;
  children: Children6[];
}

export interface Children6 {
  id: string;
  name: string;
  children: Children7[];
}

export interface Children7 {
  id: string;
  name: string;
  children: any[];
}

export interface Body3 {
  kind: string;
  content: Content;
}

export interface Content {
  name: string;
  title: string;
  keywords?: string[];
  oneliner?: string;
  details: string;
  constructor?: Constructor;
  scope?: Scope[];
  path?: string[];
  element?: boolean;
  contextual?: boolean;
  deprecation?: string;
  example: any;
  self?: boolean;
  params?: Param4[];
  returns?: string[];
  functions?: Function[];
  list?: List[];
}

export interface Constructor {
  path: any[];
  name: string;
  title: string;
  keywords: any[];
  oneliner: string;
  element: boolean;
  contextual: boolean;
  deprecation: any;
  details: string;
  example?: string;
  self: boolean;
  params: Param[];
  returns: string[];
  scope: any[];
}

export interface Param {
  name: string;
  details: string;
  example?: string;
  types: string[];
  strings: String[];
  default?: string;
  positional: boolean;
  named: boolean;
  required: boolean;
  variadic: boolean;
  settable: boolean;
}

export interface String {
  string: string;
  details: string;
}

export interface Scope {
  path: string[];
  name: string;
  title: string;
  keywords: string[];
  oneliner: string;
  element: boolean;
  contextual: boolean;
  deprecation?: string;
  details: string;
  example?: string;
  self: boolean;
  params: Param2[];
  returns: string[];
  scope: Scope2[];
}

export interface Param2 {
  name: string;
  details: string;
  example?: string;
  types: string[];
  strings: String2[];
  default?: string;
  positional: boolean;
  named: boolean;
  required: boolean;
  variadic: boolean;
  settable: boolean;
}

export interface String2 {
  string: string;
  details: string;
}

export interface Scope2 {
  path: string[];
  name: string;
  title: string;
  keywords: any[];
  oneliner: string;
  element: boolean;
  contextual: boolean;
  deprecation: any;
  details: string;
  example: any;
  self: boolean;
  params: Param3[];
  returns: string[];
  scope: any[];
}

export interface Param3 {
  name: string;
  details: string;
  example: any;
  types: string[];
  strings: any[];
  default?: string;
  positional: boolean;
  named: boolean;
  required: boolean;
  variadic: boolean;
  settable: boolean;
}

export interface Param4 {
  name: string;
  details: string;
  example?: string;
  types: string[];
  strings: String3[];
  default?: string;
  positional: boolean;
  named: boolean;
  required: boolean;
  variadic: boolean;
  settable: boolean;
}

export interface String3 {
  string: string;
  details: string;
}

export interface Function {
  path: string[];
  name: string;
  title: string;
  keywords: string[];
  oneliner: string;
  element: boolean;
  contextual: boolean;
  deprecation: any;
  details: string;
  example?: string;
  self: boolean;
  params: Param5[];
  returns: string[];
  scope: any[];
}

export interface Param5 {
  name: string;
  details: string;
  example: any;
  types: string[];
  strings: any[];
  default?: string;
  positional: boolean;
  named: boolean;
  required: boolean;
  variadic: boolean;
  settable: boolean;
}

export interface List {
  name: string;
  codepoint: number;
  accent: boolean;
  alternates: string[];
  markupShorthand?: string;
  mathShorthand?: string;
  mathClass?: string;
  deprecation?: string;
}
