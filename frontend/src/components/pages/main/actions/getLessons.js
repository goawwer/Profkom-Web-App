import { useState, useEffect } from 'react';
import axios from 'axios';
import useBaseGet from '../../../../hooks/axios/GET/useBaseGet';

const getLessons = (group, weekOffset, currentDay) => {
  const [lessons, isLoading, error] = useBaseGet({url: `/groups/${group}/schedule/?week_offset=${weekOffset}`, deps: [currentDay]})

  return [lessons, isLoading, error];
};

export default getLessons;