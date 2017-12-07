import { DefaultUrlSerializer } from '@angular/router';
import { UrlTree } from '@angular/router';
import { UrlSegmentGroup } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { forEach } from '@angular/router/src/utils/collection';
import { UrlSegment } from '@angular/router/src/url_tree';

export class UrlParser {
  constructor() { }


  public parseGroup(groupMap: { [id: string]: UrlSegmentGroup; }, level : number ): void {
    let nextlevel : number = level * 100;
    let nextSibling : number = level;
    Object.keys(groupMap).forEach(key => {
      nextSibling += 1;
      if (groupMap.hasOwnProperty(key) ) {
        //console.log(`${key}`);
        //console.log('loop each child');
        let segmentGroup = groupMap[key];
        segmentGroup.segments.forEach(element => {
          console.log(`      path:    ${element.path}`);
          if (element.parameterMap.keys.length > 0) {
            element.parameterMap.keys.forEach(pkey => {
              console.log(`      matrix Param: - ${pkey} =  ${element.parameterMap.get(pkey)}`);
            })
          }  
        });
        
        if (segmentGroup.hasChildren && segmentGroup.numberOfChildren > 0) {
          console.log(`   [${nextSibling}] [${key}] is a Branch`);
          let gpMap: { [id:string]: UrlSegmentGroup } = segmentGroup.children;
          this.parseGroup( gpMap, nextlevel);
        } else {
          console.log(`   [${nextSibling}] [${key}] is a leaf`);
        }
        
      } else {
        console.log(`${key}`);        
        console.log('this is a leaf');
      }
  
    });
  }

  public parser(url: string): void {
    let serializer: DefaultUrlSerializer = new DefaultUrlSerializer();
    let urlTree: UrlTree = serializer.parse(url);
    let primaryGroup: UrlSegmentGroup = urlTree.root.children['primary'];
    const qryParam : ParamMap = urlTree.queryParamMap;
    console.log(`This url has ${qryParam.keys.length} query param`);    
    if (qryParam.keys.length > 0 ){
      qryParam.keys.forEach(qkey => {
        console.log(` ${qkey} = ${qryParam.getAll(qkey)} `);
      })
    }
    const fragment1 : string | null = urlTree.fragment;
    console.log(` url has fragment: ${fragment1}`);
    let lvl = 10;
    let groupMap: { [id: string]: UrlSegmentGroup; } = urlTree.root.children;
    this.parseGroup( groupMap, lvl);
  }

  public parser01(url: string): void {
    let serializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    const urlTree: UrlTree = serializer.parse(url);
    const primaryGroup: UrlSegmentGroup = urlTree.root.children['primary'];

    const groupMap: { [id: string]: UrlSegmentGroup; } = urlTree.root.children;
    console.log(`urlTree serialized: ${urlTree.toString()}`);
    console.log(`urlTree serialized: ${(new DefaultUrlSerializer()).serialize(urlTree)}`);
    const qryParam : ParamMap = urlTree.queryParamMap;
    console.log(` param keys length: ${qryParam.keys.length}`);
    console.log(` QueryParams: ${JSON.stringify(qryParam)}`);
    if (qryParam.keys.length > 0 ){
      qryParam.keys.forEach(qkey => {
        console.log(` ${qkey} = ${qryParam.getAll(qkey)} `);
      })
    }
    const fragment1 : string | null = urlTree.fragment;
    console.log(` url has fragment: ${fragment1}`);
    Object.keys(groupMap).forEach(key => {
      if (groupMap.hasOwnProperty(key)) {
        var segmentGroup = groupMap[key];
        console.log(`${key} has ${segmentGroup.segments.length} segments.`)
        console.log(`  segments: ${segmentGroup.segments.toString()}`)
        segmentGroup.segments.forEach(element => {
          console.log(`    ${element.path}`);
          console.log(`    ${JSON.stringify(element.parameters)}`);
          if (element.parameterMap.keys.length > 0) {
            element.parameterMap.keys.forEach(pkey => {
              console.log(`      - ${pkey} =  ${element.parameterMap.get(pkey)}`);
            })
          }  
        });

        if (segmentGroup.hasChildren && segmentGroup.numberOfChildren > 0) {
          console.log(`    ...This segmentGroup has children`);
          console.log(`       ${segmentGroup.numberOfChildren}`);
          console.log(`     Need to find primary-->messages/44  //  secondary --> help:messages/123`)
          let group1Map: { [id: string]: UrlSegmentGroup; } = segmentGroup.children;
           
          Object.keys(group1Map).forEach(key => {       
            if (group1Map.hasOwnProperty(key)) {
              var segment1Group = group1Map[key];
              console.log(`  ${key} has ${segment1Group.segments.length} segments.`)
              console.log(`    segments: ${segment1Group.segments.toString()}`)
              segment1Group.segments.forEach(element => {
                console.log(`      ${element.path}`);
                console.log(`      ${JSON.stringify(element.parameters)}`);
                if (element.parameterMap.keys.length > 0) {
                  element.parameterMap.keys.forEach(pkey => {
                    console.log(`        - ${pkey} =  ${element.parameterMap.get(pkey)}`);
                  });
                }
                console.log(` segment1Group has children: ${segment1Group.numberOfChildren}`);
                
              });
            }
          }); 
        }
      }
    });
  }

}