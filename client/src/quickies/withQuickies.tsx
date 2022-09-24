// import React, { useEffect, useRef } from 'react';
// import { IQuickie, IRecommenderConfig } from '~/features/quickies/types';
// import { ISmartList, SmartList } from './SmartList';
// import { useAppDispatch } from '~/hooks/app';
// import { sendActivityEvent } from '../activityTracker/activityTrackerSlice';
// import { getRecommendedQuickies } from './quickieAPI';

// export type WithQuickieProps = {
//   getNext: () => Promise<IQuickie | null>;
// };

// interface QuickieConfig {
//   //displayName: string;
//   recommenderConfigs: IRecommenderConfig[];
//   localStorageKey?: string;
//   prefetchSize?: number;
// }

// class ViewedState {
//   private maximumListSize = 10_000;
//   private viewed: string[] = [];
//   private localStorageKey: string;
//   private serializeInProgress = false;

//   constructor(localStorageKey: string) {
//     let initalState = [];

//     if (localStorageKey) {
//       this.localStorageKey = localStorageKey;
//       try {
//         const serializedData = window.localStorage.getItem(localStorageKey);
//         initalState = JSON.parse(serializedData).slice(this.maximumListSize);
//       } catch (err) {
//         console.log(`failed to serialize json: ${err}`);
//       }
//     }
//   }

//   contains(key: string) {
//     // consider a more efficient contains function using a set, if needed
//     return this.viewed.includes(key);
//   }

//   addItem(key: string) {
//     this.viewed.push(key);
//     if (this.viewed.length > this.maximumListSize) {
//       this.viewed.shift();
//     }
//     if (this.localStorageKey) {
//       const serializedData = JSON.stringify(this.viewed);
//       // serialize in the background
//       this.serializeToLocalStorage().catch((e) => {
//         console.log('error serializing into local storage! viewed data will not persist');
//       });
//     }
//   }

//   private async serializeToLocalStorage() {
//     if (!this.serializeInProgress) {
//       this.serializeInProgress = true;
//       const serializedData = JSON.stringify(this.viewed);
//       window.localStorage.setItem(this.localStorageKey, serializedData);
//       this.serializeInProgress = false;
//     }
//   }
// }

// export default <P extends Record<string, unknown>>(
//   WrappedComponent: React.FunctionComponent<P & WithQuickieProps>,
//   config?: QuickieConfig,
// ): React.FunctionComponent<P & WithQuickieProps> => {
//   const HOC: React.FunctionComponent<P & WithQuickieProps> = (props) => {
//     const viewed = useRef<ViewedState>(null);
//     useEffect(function initializeViewed() {
//       if (!viewed.current) {
//         viewed.current = new ViewedState(config.localStorageKey);
//       }
//     }, []);

//     /**
//      * SmartList wraps all the functionality of choosing/rolling against an outcome
//      * so that we can simply treat it as an iterator and call getNext.
//      *
//      * All deduping, rerolling/etc will be handled internally in this reference.
//      */
//     const smartList = useRef<ISmartList<IQuickie>>(null);
//     useEffect(function initializeSmartList() {
//       smartList.current = smartList?.current
//         ? smartList.current
//         : new SmartList<IQuickie>(getRecommendedQuickies, 'fallback', config.recommenderConfigs);
//     }, []);

//     /**
//      * Next we want to ensure that we can send events. So define the
//      * method of sending events
//      */
//     const dispatch = useAppDispatch();
//     const sendEvent = (name: string, type: string, quickie: IQuickie) =>
//       dispatch(
//         sendActivityEvent({
//           name,
//           type,
//           meta: {
//             quickieId: quickie.id,
//             creatorId: quickie.creatorId.toString(),
//             source: quickie.source,
//             listRank: quickie.listRank.toString(),
//             globalRank: quickie.globalRank.toString(),
//           },
//         }),
//       );

//     /**
//      * Retrieve the next quickie from the smartlist. Managing the
//      * deduping process/etc
//      *
//      * @returns
//      */
//     async function getNext(): Promise<IQuickie | null> {
//       const current = await smartList.current.getNext();
//       if (!current) {
//         return null;
//       }

//       return {
//         ...current,
//         onImpression: () => {
//           sendEvent('icfImpression', 'quickieImpression', current);
//         },
//         onClick: () => {
//           sendEvent('icfClick', 'quickieClick', current);
//         },
//         onViewed: () => {
//           viewed.current.addItem(current.id);
//           sendEvent('icfImpression', 'quickieView', current);
//         },
//         onCTA: (kind: string) => {
//           sendEvent('icfClick', 'quickieCTA', current);
//         },
//         isViewed: () => viewed.current.contains(current.id),
//       };
//     }
//     return !smartList.current ? <div /> : <WrappedComponent getNext={getNext} {...props} />;
//   };

//   HOC.displayName = 'QuickieHOC';
//   return HOC;
// };

export {};